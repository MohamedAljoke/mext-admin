import tw from 'tailwind-styled-components';

export const HeaderDiv = tw.header`
flex 
justify-between
items-center 
px-4
py-2 
bg-darkBlue
z-50
h-16
fixed
w-[100%]
`;
export const menuButton = `
text-texts 
transform 
active:scale-90        
font-bold 
inline-flex 
items-center 
justify-center
gap-2
w-full 
rounded-md 
pr-2 
py-2 
text-sm 
hover:opacity-80 
transition-all
`;
export const menuItems = `
z-10 
origin-top-right
absolute 
right-0 
mt-2 
w-56 
rounded-md 
shadow-lg 
bg-white 
ring-1 
ring-black 
ring-opacity-5 
divide-y 
divide-gray-100 
focus:outline-none
`;
