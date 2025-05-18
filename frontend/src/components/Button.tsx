const Button = ({onClick , children } : {onClick : ()=> void , children :React.ReactNode}) => {

return (
  <button onClick={onClick } className="px-8 py-4 text-2xl shadow-2xl bg-[#80b74c] hover:bg-[#749353] text-white font-bold rounded cursor-pointer">
  {children}
  </button>
)
}

export default Button
