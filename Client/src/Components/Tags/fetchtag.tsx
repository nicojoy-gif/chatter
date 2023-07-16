export const fetchTagSuggestions = (value: string) => {
    // Implement your logic to fetch tag suggestions based on the input value
    // You can use an API call or filter tag from a predefined list
    // Return an array of tag suggestions
    const tag = ["tag1", "tag2", "tag3", "tag4", "tag5"];
    return tag.filter(tag => tag.toLowerCase().startsWith(value.toLowerCase()));
  };
  