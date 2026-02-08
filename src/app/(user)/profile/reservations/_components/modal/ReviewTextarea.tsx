interface ReviewTextareaProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  maxLength?: number;
  placeholder?: string;
}

const ReviewTextarea = ({
  value,
  onChange,
  disabled = false,
  maxLength = 100,
  placeholder = "체험에서 느낀 경험을 자유롭게 남겨주세요",
}: ReviewTextareaProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className="typo-14-body-m md:typo-16-m mb-2 h-45 w-full rounded-xl border border-gray-100
          p-4 shadow-[0px_4px_24px_0px_#9CB4CA33] disabled:bg-gray-50"
        placeholder={placeholder}
      />
      <p className="typo-13-m md:typo-14-m mb-5 w-full text-right text-gray-600">
        {value.length}/{maxLength}
      </p>
    </div>
  );
};

export default ReviewTextarea;
