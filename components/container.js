export default function Container({ children }){
  return (
    <div className="max-w-3xl mx-auto px-16px sm:px-4">
      { children }
    </div>
  )
}