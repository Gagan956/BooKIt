const express = require('express');
const router = express.Router();

// Validate promo code
router.post('/validate', (req, res) => {
  const { code, amount } = req.body;
  
  const promoCodes = {
    'SAVE10': { discount: 0.1, minAmount: 0 },
    'WELCOME20': { discount: 0.2, minAmount: 1000 },
    'SUMMER15': { discount: 0.15, minAmount: 500 }
  };

  const promo = promoCodes[code];
  
  if (!promo) {
    return res.json({ valid: false, message: 'Invalid promo code' });
  }

  if (amount < promo.minAmount) {
    return res.json({ 
      valid: false, 
      message: `Minimum amount ₹${promo.minAmount} required` 
    });
  }

  const discount = amount * promo.discount;
  
  res.json({
    valid: true,
    discount,
    discountPercent: promo.discount * 100,
    finalAmount: amount - discount
  });
});

module.exports = router;