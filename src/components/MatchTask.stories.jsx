import React from 'react'
import MatchTask from './MatchTask'

export default { title: 'Components/MatchTask', component: MatchTask }

export const Default = () => <MatchTask pairs={[{ id: 'a', label: '🍎' }, { id: 'b', label: '🍌' }]} />
