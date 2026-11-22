
type Props ={
    image:string,
    title:string
}

export default function CatagoryCard({image,title}:Props){
    return(
  <div className="p-4 bg-white border border-gray-200 border-t-[3px] border-t-[#F4512C] hover:-translate-y-1 transition duration-300 rounded-lg shadow shadow-black/10 max-w-80">
    <img className="rounded-md h-40 w-full object-cover" src={image}/>
    <p className="text-[#6B7280] text-center text-xl font-semibold ml-2 mt-4">
      {title}
    </p>
   
</div>
    )
}