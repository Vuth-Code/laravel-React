import PropTypes from 'prop-types';
import PaypalFallback from './PaypalFallback';

const PayPalComponent = ({ total = 0, onApprove, onError }) => {
  // Use PaypalFallback component instead of SimplePaypal
  return (
    <PaypalFallback
      total={total}
      onApprove={onApprove}
      onError={onError}
    />
  );
};

PayPalComponent.propTypes = {
  total: PropTypes.number,
  onApprove: PropTypes.func.isRequired,
  onError: PropTypes.func
};

export default PayPalComponent;
