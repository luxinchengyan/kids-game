import React from 'react'
import HelloWorld from './components/HelloWorld'
import MicroTask from './components/MicroTask'
import RewardToast from './components/RewardToast'

export default function App(){
  return (
    <div>
      <HelloWorld name="Player" />
      <RewardToast />
      <main style={{ padding: 20 }}>
        <MicroTask />
      </main>
    </div>
  )
}
