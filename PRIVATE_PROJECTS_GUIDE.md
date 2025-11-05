# Private Projects & Screenshots Feature

## Overview
This portfolio now supports private projects that can't be shown via GitHub or live URLs, along with expandable descriptions for better readability.

## New Features

### 1. **Project Screenshots**
For private projects, you can now showcase them using screenshots instead of live URLs or GitHub links.

#### How to add screenshots:
1. Place your project screenshots in `public/images/screenshots/`
2. Add the `screenshots` array to your project object:

```javascript
{
  title: 'Your Private Project',
  description: 'Project description...',
  status: 'Private', // or 'Live'
  screenshots: [
    '/images/screenshots/project-dashboard.jpg',
    '/images/screenshots/project-features.jpg',
    '/images/screenshots/project-analytics.jpg'
  ],
  // ... other properties
}
```

#### Screenshot Features:
- **Image Gallery**: Click on any screenshot to open a full-screen modal
- **Navigation**: Use arrow keys or buttons to navigate between images
- **Thumbnails**: Quick navigation via thumbnail grid
- **Multiple Images**: Shows "+X more" indicator when multiple screenshots exist
- **Responsive**: Works on all device sizes

### 2. **Expandable Descriptions**
Long project descriptions now have a "Read More/Read Less" functionality.

#### Auto-Detection:
- Descriptions longer than 150 characters automatically get truncated
- "Read More" button appears for expandable content
- "Read Less" button allows collapsing back to summary

### 3. **Private Project Indicators**
Projects without GitHub/live URLs show appropriate status:

#### Button States:
- **Live Project**: Shows "View Live" and/or "GitHub" buttons
- **With Screenshots**: Shows "View Screenshots" button
- **Fully Private**: Shows "Private Project" disabled button

## File Structure

```
public/
  images/
    screenshots/
      ├── project1-dashboard.jpg
      ├── project1-features.jpg
      ├── project2-overview.jpg
      └── placeholder.svg (demo placeholder)
```

## Project Object Schema

```javascript
{
  title: string,
  description: string, // Auto-expandable if > 150 chars
  icon: string,
  status: 'Live' | 'Private' | 'Production',
  technologies: string[],
  category: string | string[], // Support for multiple categories
  metrics: {
    users: string,
    performance: string,
    uptime: string
  },
  
  // Optional URLs (for public projects)
  liveUrl?: string,
  githubUrl?: string,
  
  // Optional Screenshots (for private projects)
  screenshots?: string[]
}
```

## Usage Examples

### Public Project (with URLs)
```javascript
{
  title: 'Public Web App',
  description: 'A public web application...',
  status: 'Live',
  liveUrl: 'https://example.com',
  githubUrl: 'https://github.com/user/repo'
}
```

### Private Project (with screenshots)
```javascript
{
  title: 'Internal CRM System',
  description: 'A comprehensive customer relationship management system...',
  status: 'Private',
  screenshots: [
    '/images/screenshots/crm-dashboard.jpg',
    '/images/screenshots/crm-contacts.jpg',
    '/images/screenshots/crm-reports.jpg'
  ]
}
```

### Private Project (no screenshots)
```javascript
{
  title: 'Confidential Analytics Tool',
  description: 'A highly sensitive analytics platform...',
  status: 'Private'
  // No URLs or screenshots - will show "Private Project" button
}
```

## Keyboard Shortcuts (in Screenshot Modal)
- **Escape**: Close modal
- **Arrow Left**: Previous image
- **Arrow Right**: Next image

## Best Practices

### Screenshot Guidelines:
1. **Resolution**: Use high-resolution images (1920x1080 or higher)
2. **Format**: JPG/PNG for photos, SVG for illustrations
3. **Size**: Optimize images to keep them under 500KB each
4. **Naming**: Use descriptive names like `project-dashboard.jpg`

### Description Guidelines:
1. **Length**: Keep initial view under 150 characters for clean layout
2. **Detail**: Add comprehensive details knowing users can expand to read more
3. **Structure**: Use clear, engaging language that summarizes key features

### Security Considerations:
1. **Sensitive Data**: Blur or mask any sensitive information in screenshots
2. **User Data**: Never include real user data in screenshots
3. **Credentials**: Ensure no API keys or passwords are visible

## Implementation Notes

- The screenshot modal prevents background scrolling
- Images are lazy-loaded for better performance  
- Modal is accessible via keyboard navigation
- Responsive design works on all screen sizes
- Graceful fallback for projects without screenshots
