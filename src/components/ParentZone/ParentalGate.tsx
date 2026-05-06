import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ParentalGateProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const ParentalGate: React.FC<ParentalGateProps> = ({ onSuccess, onCancel }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setNum1(Math.floor(Math.random() * 10) + 10);
    setNum2(Math.floor(Math.random() * 10) + 5);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(answer) === num1 + num2) {
      onSuccess();
    } else {
      setError(true);
      setAnswer('');
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        style={{
          background: '#FFFFFF',
          borderRadius: '32px',
          padding: '40px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔐</div>
        <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#3E2723', marginBottom: '12px' }}>家长验证</h2>
        <p style={{ color: '#6D4C41', fontWeight: 600, marginBottom: '24px', lineHeight: 1.6 }}>
          为了确保安全，请请家长输入以下算式的答案：
        </p>
        
        <div style={{ 
          fontSize: '32px', 
          fontWeight: 900, 
          color: '#FF9800', 
          marginBottom: '24px',
          background: '#FFF8E1',
          padding: '20px',
          borderRadius: '16px',
          border: '2px dashed #FFB74D'
        }}>
          {num1} + {num2} = ?
        </div>

        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="答案"
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '20px',
              borderRadius: '16px',
              border: error ? '2px solid #F44336' : '2px solid #E0E0E0',
              textAlign: 'center',
              marginBottom: '20px',
              outline: 'none',
              transition: 'all 0.3s',
            }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '16px',
                borderRadius: '16px',
                border: 'none',
                background: '#F5F5F5',
                color: '#757575',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              返回
            </button>
            <button
              type="submit"
              style={{
                padding: '16px',
                borderRadius: '16px',
                border: 'none',
                background: 'linear-gradient(135deg, #FF9800, #F57C00)',
                color: '#FFFFFF',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 8px 16px rgba(255,152,0,0.2)',
              }}
            >
              验证
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
