import React from 'react';

const ProductDescriptions = ({ descriptions }) => {
  return (
    <div className='flex flex-col w-1/2 border rounded p-2 h-96'>
      <h2 className='text-2xl my-2 bg-blend-lighten font-bold'>Product Descriptions</h2>
      <ol className='h-full w-full overflow-y-auto list-decimal gap-4'>
        {descriptions.map((description, index) => (
          <>
            <li key={index} className='flex flex-col p-4 gap-1'>
              <div className='bg-green-100 p-1'>{description.question}</div>
              <div className='bg-gray-100 p-1'>{description.answer}</div>
            </li>
            <hr />
          </>
        ))}
      </ol>
    </div>
  );
};

export default ProductDescriptions;
