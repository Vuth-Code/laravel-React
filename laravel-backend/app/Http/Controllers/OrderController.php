<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Get all orders (admin endpoint)
     */
    public function index(Request $request)
    {
        try {
            $orders = Order::with(['items.product', 'user'])
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'list' => $orders,
                'count' => $orders->count()
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching orders: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch orders',
                'errors' => ['server' => [$e->getMessage()]]
            ], 500);
        }
    }

    /**
     * Create a new order
     */
    public function store(Request $request)
    {
        try {
            // Log the incoming request for debugging
            Log::info('Order creation request received', ['data' => $request->all()]);

            // Validate the request
            $request->validate([
                'items' => 'required|array',
                'items.*.product_id' => 'required|exists:products,id',
                'items.*.quantity' => 'required|integer|min:1',
                'items.*.price' => 'required|numeric|min:0',
                'total_amount' => 'required|numeric|min:0',
                'payment_method' => 'required|string',
                'payment_status' => 'required|string|in:pending,paid,failed,refunded',
                'transaction_id' => 'nullable|string',
                'shipping_details' => 'required|array',
                'shipping_details.firstName' => 'required|string',
                'shipping_details.lastName' => 'required|string',
                'shipping_details.email' => 'required|email',
                'shipping_details.address' => 'required|string',
                'shipping_details.city' => 'required|string',
                'shipping_details.state' => 'required|string',
                'shipping_details.zipCode' => 'required|string',
                'shipping_details.country' => 'required|string',
                'shipping_details.phone' => 'required|string',
            ]);

            // Get the authenticated user
            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Start a database transaction
            DB::beginTransaction();

            // Create the order
            $order = new Order();
            $order->user_id = $user->id;
            $order->total_amount = $request->total_amount;
            $order->payment_method = $request->payment_method;
            $order->payment_status = $request->payment_status;
            $order->transaction_id = $request->transaction_id;

            // Format shipping details
            $shippingDetails = $request->shipping_details;
            $order->shipping_address = $shippingDetails['address'];
            $order->shipping_city = $shippingDetails['city'];
            $order->shipping_state = $shippingDetails['state'];
            $order->shipping_zipcode = $shippingDetails['zipCode'];
            $order->shipping_country = $shippingDetails['country'];
            $order->shipping_phone = $shippingDetails['phone'];

            // Default status is pending
            $order->status = 'pending';

            $order->save();

            // Create order items
            foreach ($request->items as $item) {
                $orderItem = new OrderItem();
                $orderItem->order_id = $order->id;
                $orderItem->product_id = $item['product_id'];
                $orderItem->quantity = $item['quantity'];
                $orderItem->price = $item['price'];
                $orderItem->subtotal = $item['price'] * $item['quantity'];
                $orderItem->save();

                // Update product quantity (optional)
                // $product = Product::find($item['product_id']);
                // $product->quantity = $product->quantity - $item['quantity'];
                // $product->save();
            }

            // Commit the transaction
            DB::commit();

            // Return success response
            return response()->json([
                'success' => true,
                'message' => 'Order created successfully',
                'order' => $order->load('items')
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            Log::error('Order validation error: ' . $e->getMessage(), ['errors' => $e->errors()]);
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating order: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to create order',
                'errors' => ['server' => [$e->getMessage()]]
            ], 500);
        }
    }

    /**
     * Get order details
     */
    public function show(Request $request, $id)
    {
        try {
            $order = Order::with(['items.product', 'user'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $order
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching order details: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch order details',
                'errors' => ['server' => [$e->getMessage()]]
            ], 500);
        }
    }

    /**
     * Update order status
     */
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
                'payment_status' => 'required|in:pending,paid,failed,refunded'
            ]);

            $order = Order::findOrFail($id);
            $order->status = $request->status;
            $order->payment_status = $request->payment_status;
            $order->save();

            return response()->json([
                'success' => true,
                'message' => 'Order status updated successfully',
                'data' => $order
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating order: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update order',
                'errors' => ['server' => [$e->getMessage()]]
            ], 500);
        }
    }
}

