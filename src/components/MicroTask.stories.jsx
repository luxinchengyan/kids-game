import React from 'react';
import MicroTask from './MicroTask';

export default {
  title: 'Components/MicroTask',
  component: MicroTask,
};

export const Default = () => <MicroTask items={[{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }]} />;
