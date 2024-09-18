# ButtonV2 Component Guidelines

The ButtonV2 component is a flexible and customizable button component built on top of Ant Design's Button component. It provides additional styling options and variants to match our design system.

## Import

```jsx
import ButtonV2 from './path/to/ButtonV2';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | 'block' \| 'link' \| 'text' \| 'outlined' | 'block' | Determines the overall style of the button |
| variant | 'primary' \| 'secondary' \| 'danger' | 'primary' | Sets the color scheme of the button |
| size | 'small' \| 'middle' \| 'large' | 'middle' | Determines the size of the button |
| shape | 'default' \| 'circle' \| 'round' | undefined | Sets the shape of the button |
| label | string | undefined | The text content of the button |
| disabled | boolean | false | Disables the button when true |
| loading | boolean | false | Shows a loading spinner when true |
| fullWidth | boolean | false | Makes the button take up the full width of its container |
| className | string | undefined | Additional CSS classes to apply to the button |
| icon | React.ReactNode | undefined | Icon to display in the button |
| iconPosition | 'start' \| 'end' | undefined | Position of the icon relative to the label |
| href | string | undefined | Turns the button into a link when provided |
| htmlType | 'button' \| 'submit' \| 'reset' | 'button' | Sets the HTML type attribute of the button |
| onClick | () => void | undefined | Function to call when the button is clicked |

## Usage Guidelines

1. **Type**: 
   - Use 'block' for standard, filled buttons
   - Use 'link' for clickable text that looks like a hyperlink
   - Use 'text' for low-emphasis actions
   - Use 'outlined' for secondary actions

2. **Variant**:
   - Use 'primary' for the main action on a page
   - Use 'secondary' for less prominent actions
   - Use 'danger' for destructive actions like delete

3. **Size**:
   - Use 'small' for compact UIs or inline with text
   - Use 'middle' for most standard cases
   - Use 'large' for calls to action or important buttons

4. **Shape**:
   - Omit or use 'default' for standard rounded corners
   - Use 'circle' for icon-only circular buttons
   - Use 'round' for fully rounded ends

5. **Icons**:
   - Use icons to provide visual cues about the action
   - Generally place icons at the start for action buttons and at the end for navigation buttons

6. **Accessibility**:
   - Always provide a meaningful label, even for icon-only buttons (use aria-label in such cases)
   - Use the 'disabled' prop instead of 'onClick={undefined}' for inactive buttons

## Examples

1. Standard Primary Button:
```jsx
<ButtonV2 
  type="block"
  variant="primary"
  size="middle"
  label="Submit"
  onClick={() => handleSubmit()}
/>
```

2. Outlined Danger Button with Icon:
```jsx
<ButtonV2 
  type="outlined"
  variant="danger"
  size="small"
  label="Delete"
  icon={<TrashIcon />}
  iconPosition="start"
  onClick={() => handleDelete()}
/>
```

3. Full-width Secondary Button:
```jsx
<ButtonV2 
  type="block"
  variant="secondary"
  size="large"
  label="Load More"
  fullWidth
  onClick={() => loadMoreItems()}
/>
```

4. Link-style Button:
```jsx
<ButtonV2 
  type="link"
  variant="primary"
  label="View Details"
  href="/details"
/>
```

5. Circular Icon Button:
```jsx
<ButtonV2 
  type="block"
  variant="primary"
  shape="circle"
  icon={<PlusIcon />}
  aria-label="Add Item"
  onClick={() => addItem()}
/>
```

Remember to always consider the context and hierarchy of actions when choosing button styles. Consistent use of button variants and sizes across your application will greatly improve user experience and interface coherence.
