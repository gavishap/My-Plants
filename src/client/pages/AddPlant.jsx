import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import createPlant from '@wasp/actions/createPlant';

export function AddPlantPage() {
  const createPlantFn = useAction(createPlant);
  const history = useHistory();
  const [name, setName] = useState('');
  const [wateringFrequency, setWateringFrequency] = useState(0);

  const handleCreatePlant = async () => {
    await createPlantFn({
      name: name,
      wateringFrequency: wateringFrequency
    });
    history.push('/');
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Add Plant</h2>
      <form onSubmit={handleCreatePlant}>
        <div className='mb-4'>
          <label htmlFor='name' className='block font-bold'>Name:</label>
          <input type='text' id='name' className='border border-gray-300 p-2 rounded' value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className='mb-4'>
          <label htmlFor='wateringFrequency' className='block font-bold'>Watering Frequency (in days):</label>
          <input type='number' id='wateringFrequency' className='border border-gray-300 p-2 rounded' value={wateringFrequency} onChange={(e) => setWateringFrequency(parseInt(e.target.value))} required />
        </div>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Create Plant</button>
      </form>
      <Link to='/' className='block mt-4 text-blue-500 hover:underline'>Back to Home</Link>
    </div>
  );
}