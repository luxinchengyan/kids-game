import React from 'react'
import HelloWorld from './components/HelloWorld'
import MicroTask from './components/MicroTask'

export default function App(){
  return (
    <div>
      <HelloWorld name="Player" />
      <main style={{ padding: 20 }}>
        <MicroTask />
      </main>
    </div>
  )
}
