import { __ } from "@wordpress/i18n";
import { Dashicon } from "@wordpress/components";
import { useState, useRef, useEffect } from "@wordpress/element";

export const CustomSelectControl = ({
  label,
  value,
  options,
  onChange,
  className = '',
  help = '',
  placeholder = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex(prev => 
          Math.min(prev + 1, options.length - (placeholder ? 0 : 1)))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault();
        const selectedOption = options[highlightedIndex - (placeholder ? 1 : 0)];
        if (selectedOption) {
          onChange(selectedOption.value);
          setIsOpen(false);
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, highlightedIndex, options, placeholder]);

  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  return (
    <div 
      className={`modern-select-control ${className} ${isOpen ? 'is-open' : ''}`}
      ref={selectRef}
    >
      {label && <label className="modern-select-label">{label}</label>}
      
      <div 
        className="modern-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => e.key === ' ' && setIsOpen(!isOpen)}
        tabIndex="0"
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="modern-select-value">
          {selectedLabel}
        </span>
        <span className="modern-select-arrow">
          <Dashicon icon={isOpen ? "arrow-up-alt2" : "arrow-down-alt2"} />
        </span>
      </div>

      {isOpen && (
        <div 
          className="modern-select-dropdown"
          ref={dropdownRef}
          role="listbox"
        >
          {placeholder && (
            <div
              className={`modern-select-option ${!value ? 'is-selected' : ''}`}
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(0)}
            >
              {placeholder}
            </div>
          )}
          {options.map((option, index) => (
            <div
              key={option.value}
              className={`modern-select-option ${value === option.value ? 'is-selected' : ''} ${
                highlightedIndex === index + (placeholder ? 1 : 0) ? 'is-highlighted' : ''
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index + (placeholder ? 1 : 0))}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {help && <p className="modern-select-help">{help}</p>}
    </div>
  );
};

