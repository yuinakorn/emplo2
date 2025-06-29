# Dashboard Components

## PieChart Component (Doughnut Chart)

### Overview
The `PieChart.vue` component displays today's work attendance status in a doughnut chart format, using data that matches the StatsCard structure.

### Features
- **Interactive Doughnut Chart**: Built with Chart.js for smooth animations and interactions
- **Responsive Design**: Adapts to different screen sizes
- **Custom Legend**: Built-in legend with color indicators and percentage values
- **Dynamic Updates**: Can be updated with new data programmatically
- **Dark Mode Support**: Compatible with theme switching
- **Thai Language Support**: All labels and tooltips in Thai
- **Doughnut Hole**: 60% cutout for modern visual appeal

### Data Structure
The component expects data in the following format:

```javascript
const attendanceData = [
  { 
    label: 'มาตรงเวลา',
    value: 230,
    backgroundColor: '#10B981', // green-500
    borderColor: '#059669', // green-600
    percentage: 95.8
  },
  { 
    label: 'มาสาย',
    value: 12,
    backgroundColor: '#EF4444', // red-500
    borderColor: '#DC2626', // red-600
    percentage: 5.0
  },
  { 
    label: 'ยังไม่เข้างาน/ไปราชการ/ลา',
    value: 17,
    backgroundColor: '#F59E0B', // amber-500
    borderColor: '#D97706', // amber-600
    percentage: 7.1
  }
]
```

### Usage

#### Basic Usage
```vue
<template>
  <dashboardPieChart />
</template>
```

#### With Dynamic Data Updates
```vue
<template>
  <dashboardPieChart ref="pieChartRef" />
  <button @click="updateData">Update Chart</button>
</template>

<script setup>
import { ref } from 'vue'

const pieChartRef = ref(null)

const updateData = () => {
  const newData = [
    { label: 'มาตรงเวลา', value: 200, backgroundColor: '#10B981', borderColor: '#059669', percentage: 90.0 },
    { label: 'มาสาย', value: 15, backgroundColor: '#EF4444', borderColor: '#DC2626', percentage: 6.8 },
    { label: 'ยังไม่เข้างาน/ไปราชการ/ลา', value: 7, backgroundColor: '#F59E0B', borderColor: '#D97706', percentage: 3.2 }
  ]
  
  pieChartRef.value.updateChartData(newData)
}
</script>
```

### Props
Currently, the component doesn't accept props. All data is managed internally or updated via the `updateChartData` method.

### Methods

#### `updateChartData(newData)`
Updates the chart with new data.

**Parameters:**
- `newData` (Array): Array of objects with the same structure as the initial data

**Example:**
```javascript
pieChartRef.value.updateChartData([
  { label: 'มาตรงเวลา', value: 200, backgroundColor: '#10B981', borderColor: '#059669', percentage: 90.0 },
  // ... more data
])
```

### Styling
The component uses Tailwind CSS classes and DaisyUI components for styling. It supports:
- Light and dark themes
- Custom color schemes
- Responsive design
- Hover effects and animations

### Dependencies
- `chart.js` - For chart rendering
- `vue` - For component framework
- `tailwindcss` - For styling
- `daisyui` - For UI components

### Demo
Visit `/demo-piechart` to see an interactive demo of the component with:
- Real-time data updates
- Interactive controls
- Data summary table
- Random data generation

### Integration with StatsCard
The PieChart component is designed to work seamlessly with the existing StatsCard component, using the same data structure and color scheme for consistency across the dashboard. 