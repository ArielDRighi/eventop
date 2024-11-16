"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ShoppingCart as ShoppingCartIcon, CreditCard } from 'lucide-react';
import Image from 'next/image';


type Event = {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  price: number;
};

type PurchaseHistoryItem = {
  id: string;
  eventName: string;
  date: string;
  quantity: number;
  total: number;
};


export default function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState<Event[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

 
  const event: Event = {
    id: '1',
    name: 'Summer Music Festival',
    imageUrl: 'https://i.pinimg.com/736x/1a/d2/30/1ad230952c410779a8f11b60818aef06.jpg',
    category: 'Music',
    date: '2023-07-15',
    time: '18:00',
    location: 'Central Park, New York',
    capacity: 5000,
    price: 99.99,
  };

  
  const addToCart = () => setCartItems([...cartItems, event]);
  const removeFromCart = (id: string) => setCartItems(cartItems.filter(item => item.id !== id));
  const checkout = () => {
    const newPurchase: PurchaseHistoryItem = {
      id: Date.now().toString(),
      eventName: event.name,
      date: new Date().toISOString(),
      quantity: cartItems.length,
      total: cartItems.reduce((sum, item) => sum + item.price, 0),
    };
    setPurchaseHistory([newPurchase, ...purchaseHistory]);
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>

       
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Detalle de la Compra</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Tu carrito está vacío.</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0">
                  <div className="flex items-center">
                    <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="rounded-md mr-4" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{item.date}</span>
                        <Clock className="h-4 w-4 ml-3 mr-1" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-900">${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-gray-900">Total</span>
              <span className="text-xl font-semibold text-gray-900">
                ${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </span>
            </div>
            <button
              onClick={checkout}
              disabled={cartItems.length === 0}
              className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceder al Pago
            </button>
          </div>
        </div>

        {/* Evento disponible */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Evento Disponible</h2>
            <div className="flex items-center">
              <Image src={event.imageUrl} alt={event.name} width={96} height={96} className="rounded-md mr-4" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">{event.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{event.date}</span>
                  <Clock className="h-4 w-4 ml-3 mr-1" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Capacidad: {event.capacity}</span>
                </div>
              </div>
            </div>
            <button
              onClick={addToCart}
              className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>

        {/* Historial de compras */}
        <div className="mt-8">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center text-purple-600 hover:text-purple-800"
          >
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            {showHistory ? 'Ocultar Historial de Compras' : 'Ver Historial de Compras'}
          </button>

          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Historial de Compras</h2>
                {purchaseHistory.length === 0 ? (
                  <p className="text-gray-500">No hay compras previas.</p>
                ) : (
                  purchaseHistory.map((purchase) => (
                    <div key={purchase.id} className="border-b border-gray-200 py-4 last:border-b-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{purchase.eventName}</h3>
                          <p className="text-sm text-gray-500">Fecha: {new Date(purchase.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-500">Cantidad: {purchase.quantity}</p>
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-lg font-medium text-gray-900">${purchase.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}