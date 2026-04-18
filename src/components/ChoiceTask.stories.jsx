import React from 'react'
import ChoiceTask from './ChoiceTask'

export default { title: 'Components/ChoiceTask', component: ChoiceTask }

export const Default = () => <ChoiceTask question={'哪个是 A？'} options={[{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }]} correct={'a'} />
