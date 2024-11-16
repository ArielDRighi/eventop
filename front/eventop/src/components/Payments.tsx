"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Language = 'es' | 'en' | 'pt' | 'fr';
type Currency = 'USD' | 'EUR' | 'ARS' | 'BRL';

const texts = {
  es: {
    title: 'Compra de Entradas',
    description: 'Selecciona tus entradas, moneda y elige el método de pago',
    selectLanguage: 'Seleccionar Idioma',
    selectCurrency: 'Seleccionar Moneda',
    tickets: 'Número de Entradas',
    paymentMethod: 'Método de Pago',
    creditCard: 'Tarjeta de Crédito',
    mercadoPago: 'Mercado Pago',
    name: 'Nombre en la Tarjeta',
    cardNumber: 'Número de Tarjeta',
    expiry: 'Fecha de Vencimiento',
    cvc: 'CVC',
    total: 'Total',
    pay: 'Pagar Ahora',
    orderSummary: 'Resumen de la Orden',
    savePaymentInfo: 'Guardar información de pago',
    processing: 'Procesando pago...',
    invalidCard: 'Número de tarjeta inválido',
    invalidExpiry: 'Fecha de vencimiento inválida',
    invalidCVC: 'CVC inválido'
  },
  en: {
    title: 'Ticket Purchase',
    description: 'Select your tickets, currency and choose the payment method',
    selectLanguage: 'Select Language',
    selectCurrency: 'Select Currency',
    tickets: 'Number of Tickets',
    paymentMethod: 'Payment Method',
    creditCard: 'Credit Card',
    mercadoPago: 'Mercado Pago',
    name: 'Name on Card',
    cardNumber: 'Card Number',
    expiry: 'Expiry Date',
    cvc: 'CVC',
    total: 'Total',
    pay: 'Pay Now',
    orderSummary: 'Order Summary',
    savePaymentInfo: 'Save payment information',
    processing: 'Processing payment...',
    invalidCard: 'Invalid card number',
    invalidExpiry: 'Invalid expiry date',
    invalidCVC: 'Invalid CVC'
  },
  pt: {
    title: 'Compra de Ingressos',
    description: 'Selecione seus ingressos, moeda e escolha o método de pagamento',
    selectLanguage: 'Selecionar Idioma',
    selectCurrency: 'Selecionar Moeda',
    tickets: 'Número de Ingressos',
    paymentMethod: 'Método de Pagamento',
    creditCard: 'Cartão de Crédito',
    mercadoPago: 'Mercado Pago',
    name: 'Nome no Cartão',
    cardNumber: 'Número do Cartão',
    expiry: 'Data de Validade',
    cvc: 'CVC',
    total: 'Total',
    pay: 'Pagar Agora',
    orderSummary: 'Resumo do Pedido',
    savePaymentInfo: 'Salvar informações de pagamento',
    processing: 'Processando pagamento...',
    invalidCard: 'Número de cartão inválido',
    invalidExpiry: 'Data de validade inválida',
    invalidCVC: 'CVC inválido'
  },
  fr: {
    title: 'Achat de Billets',
    description: 'Sélectionnez vos billets, la devise et choisissez le mode de paiement',
    selectLanguage: 'Sélectionner la Langue',
    selectCurrency: 'Sélectionner la Devise',
    tickets: 'Nombre de Billets',
    paymentMethod: 'Mode de Paiement',
    creditCard: 'Carte de Crédit',
    mercadoPago: 'Mercado Pago',
    name: 'Nom sur la Carte',
    cardNumber: 'Numéro de Carte',
    expiry: 'Date d\'Expiration',
    cvc: 'CVC',
    total: 'Total',
    pay: 'Payer Maintenant',
    orderSummary: 'Résumé de la Commande',
    savePaymentInfo: 'Sauvegarder les informations de paiement',
    processing: 'Traitement du paiement...',
    invalidCard: 'Numéro de carte invalide',
    invalidExpiry: 'Date d\'expiration invalide',
    invalidCVC: 'CVC invalide'
  }
};

const currencies = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.85 },
  ARS: { symbol: 'ARS$', rate: 350 },
  BRL: { symbol: 'R$', rate: 4.9 }
};

export default function Payments() {
  const [ticketCount, setTicketCount] = useState(1);
  const [basePrice, setBasePrice] = useState(50); // Price in USD
  console.log(setBasePrice);
  const [total, setTotal] = useState(50);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [language, setLanguage] = useState<Language>('es');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [savePaymentInfo, setSavePaymentInfo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({ cardNumber: false, cardExpiry: false, cardCVC: false });

  useEffect(() => {
    const newTotal = ticketCount * basePrice * currencies[currency].rate;
    setTotal(Number(newTotal.toFixed(2)));
  }, [ticketCount, currency, basePrice]);

  const handleTicketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTicketCount(parseInt(e.target.value));
  };

  const validateForm = () => {
    const newErrors = {
      cardNumber: !/^[0-9]{16}$/.test(cardNumber.replace(/\s/g, '')),
      cardExpiry: !/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(cardExpiry),
      cardCVC: !/^[0-9]{3,4}$/.test(cardCVC)
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsProcessing(true);
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Processing payment for', ticketCount, 'tickets. Total:', total, currency, 'Method:', paymentMethod);
      setIsProcessing(false);
    }
  };

  const t = texts[language];
  const currencySymbol = currencies[currency].symbol;

  return (
    <div className="max-w-sm  mx-auto mt-10 p-6 bg-white text-gray-900 shadow-xl rounded-xl transition-all duration-300 ease-in-out hover:shadow-2xl sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600 text-xs sm:text-sm mb-4">{t.description}</p>
      </motion.div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="language" className="block text-sm font-semibold mb-2">{t.selectLanguage}</label>
            <select 
              id="language" 
              onChange={(e) => setLanguage(e.target.value as Language)} 
              value={language} 
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white transition-colors duration-200 text-gray-800"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-semibold mb-2">{t.selectCurrency}</label>
            <select 
              id="currency" 
              onChange={(e) => setCurrency(e.target.value as Currency)} 
              value={currency} 
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white transition-colors duration-200 text-gray-800"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="ARS">ARS (ARS$)</option>
              <option value="BRL">BRL (R$)</option>
            </select>
          </div>

          <div>
            <label htmlFor="tickets" className="block text-sm font-semibold mb-2">{t.tickets}</label>
            <select 
              id="tickets" 
              onChange={handleTicketChange} 
              value={ticketCount} 
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white transition-colors duration-200 text-gray-800"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <span className="block text-sm font-semibold mb-3">{t.paymentMethod}</span>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                id="credit_card"
                value="credit_card"
                checked={paymentMethod === 'credit_card'}
                onChange={() => setPaymentMethod('credit_card')}
                className="form-radio h-5 w-5 text-purple-600 transition duration-150 ease-in-out"
              />
              <span className="text-sm">{t.creditCard}</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                id="mercado_pago"
                value="mercado_pago"
                checked={paymentMethod === 'mercado_pago'}
                onChange={() => setPaymentMethod('mercado_pago')}
                className="form-radio h-5 w-5 text-purple-600 transition duration-150 ease-in-out"
              />
              <span className="text-sm">{t.mercadoPago}</span>
            </label>
          </div>
        </div>

        <AnimatePresence>
          {paymentMethod === 'credit_card' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 overflow-hidden"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">{t.name}</label>
                <input 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                  className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white transition-colors duration-200 text-gray-800" 
                />
              </div>
              <div>
                <label htmlFor="card" className="block text-sm font-semibold mb-2">{t.cardNumber}</label>
                <input 
                  id="card" 
                  placeholder="1234 5678 9012 3456" 
                  required 
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className={`w-full px-3 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-purple-500'} rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white transition-colors duration-200 text-gray-800`}
                />
                {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{t.invalidCard}</p>}
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="expiry" className="block text-sm font-semibold mb-2">{t.expiry}</label>
                  <input 
                    id="expiry" 
                    placeholder="MM/YY" 
                    required 
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className={`w-full px-3 py-2 border ${errors.cardExpiry ? 'border-red-500' : 'border-purple-500'} rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white transition-colors duration-200 text-gray-800`}
                  />
                  {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{t.invalidExpiry}</p>}
                </div>
                <div className="flex-1">
                  <label htmlFor="cvc" className="block text-sm font-semibold mb-2">{t.cvc}</label>
                  <input 
                    id="cvc" 
                    placeholder="123" 
                    required 
                    value={cardCVC}
                    onChange={(e) => setCardCVC(e.target.value)}
                    className={`w-full px-3 py-2 border ${errors.cardCVC ? 'border-red-500' : 'border-purple-500'} rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white transition-colors duration-200 text-gray-800`}
                  />
                  {errors.cardCVC && <p className="text-red-500 text-xs mt-1">{t.invalidCVC}</p>}
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="savePaymentInfo"
                  checked={savePaymentInfo}
                  onChange={(e) => setSavePaymentInfo(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-purple-600"
                />
                <label htmlFor="savePaymentInfo" className="ml-2 text-sm text-gray-700">{t.savePaymentInfo}</label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-100 p-4 rounded-lg"
        >
          <h3 className="font-semibold mb-2">{t.orderSummary}</h3>
          <p>{t.tickets}: {ticketCount}</p>
          <p className="text-xl font-bold mt-2">{t.total}: {currencySymbol}{total}</p>
        </motion.div>

        <div className="flex justify-center pt-6">
          <button 
            type="submit" 
            disabled={isProcessing}
            className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isProcessing ? t.processing : t.pay}
          </button>
        </div>
      </form>
    </div>
  );
}

