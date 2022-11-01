export default function Container({ fullWidthOnMobile, children }){
  const mobilePx = fullWidthOnMobile ? 'px-0' : 'px-16px'
  return (
    <div className="grow py-32px md:py-12">
      <div className={`max-w-3xl mx-auto ${mobilePx} sm:px-4`}>
        { children }
      </div>
    </div>
  )
}