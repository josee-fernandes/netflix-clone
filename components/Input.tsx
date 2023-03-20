interface IInputProps {
  id: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  label: string
  type?: string
}

const Input: React.FC<IInputProps> = ({ id, onChange, value, label, type }) => {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        className="
          block
          rounded-md
          px-6
          pt-6
          pb-1
          w-full
          text-md
          text-white
          bg-neutral-700
          appearance-none
          focus:outline-none
          focus:ring-0
          peer
        "
        placeholder=" "
        required
        onChange={onChange}
      />
      <label
        className="
          absolute
          text-md
          text-zinc-400
          duration-150
          transform
          -translate-t-3
          scale-75
          top-4
          z-10
          origin-[0]
          left-6
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-3
          peer-valid:scale-75
          peer-valid:-translate-y-3
        "
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  )
}

export default Input
