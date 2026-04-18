import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useGameStore from '../store/gameStore'

export default function RewardToast(){
  const rewards = useGameStore(s=>s.rewards)
  const clearRewards = useGameStore(s=>s.clearRewards)

  useEffect(()=>{
    if(rewards && rewards.length){
      const t = setTimeout(()=>clearRewards(), 1000)
      return ()=>clearTimeout(t)
    }
  },[rewards, clearRewards])

  if(!rewards || rewards.length === 0) return null

  return (
    <div style={{ position: 'fixed', right: 20, top: 20, zIndex: 9999 }}>
      <AnimatePresence>
        {rewards.map((r, i) => (
          <motion.div key={i} data-testid="reward" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ background: '#fff3e0', padding: 10, borderRadius: 8, boxShadow: '0 6px 18px rgba(0,0,0,0.12)', marginBottom: 8 }}>
            {r.type === 'star' ? '✨ +1 星' : '✅'}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
