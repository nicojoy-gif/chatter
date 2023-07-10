import React, { useState } from "react";
import Select, { InputActionMeta } from "react-select";

interface TagInputProps {
  placeholder: string;
  suggestions: string[];
  onChange: (tags: string[]) => void;
  onInputChange: (newValue: string, actionMeta: InputActionMeta) => void;
  tag: string[];
}

const TagInput: React.FC<TagInputProps> = ({
  placeholder,
  suggestions,
  onChange,
  onInputChange,
  tag,
}) => {
  const [value, setValue] = useState("");

  const handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
    setValue(newValue);
    onInputChange(newValue, actionMeta);
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && value.trim() !== "") {
      const updatedTags = [...tag, value.trim()];
      onChange(updatedTags);
      setValue("");
    }
  };

  const tagOptions = suggestions.map((suggestion) => ({
    value: suggestion,
    label: suggestion,
  }));

  const selectedTags = tagOptions.filter((option) =>
    tag.includes(option.value)
  );

  return (
    <Select
      placeholder={placeholder}
      value={selectedTags}
      isMulti
      options={tagOptions}
      onChange={(selectedOptions, actionMeta) => {
        const tagsArray = (
          selectedOptions as { value: string; label: string }[]
        ).map((option) => option.value);
        onChange(tagsArray);
      }}
      onInputChange={handleInputChange}
      inputValue={value}
      onKeyDown={handleInputKeyPress}
    />
  );
};

export default TagInput;
