// app/api/placeholder-svg/route.ts

import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles GET requests to generate dynamic SVG placeholders.
 *
 * Query Parameters:
 * - width (number, default: 600): Width of the SVG.
 * - height (number, default: 400): Height of the SVG.
 * - text (string, default: "width x height"): Text to display inside the SVG.
 * - bgColor (string, default: "DDDDDD"): Hex color for the background (without #).
 * - textColor (string, default: "999999"): Hex color for the text (without #).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Parse query parameters, with default values
  const width = parseInt(searchParams.get('width') || '600', 10);
  const height = parseInt(searchParams.get('height') || '400', 10);
  const text = searchParams.get('text') || `${width}x${height}`;
  const bgColor = searchParams.get('bgColor') || 'DDDDDD'; // Default light gray
  const textColor = searchParams.get('textColor') || '999999'; // Default dark gray

  // Basic validation for width and height
  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    return new NextResponse('Invalid width or height parameters. Please provide positive numbers.', { status: 400 });
  }

  // Calculate font size dynamically based on height and width
  // This is a simple heuristic; you might need a more sophisticated one for complex text
  const fontSize = Math.max(12, Math.min(height / 4, width / text.length * 1.5));

  // Calculate text position for centering
  const textY = height / 2;
  const textX = width / 2;

  // Construct the SVG string
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="#${bgColor}"/>
      <text x="${textX}" y="${textY}" fill="#${textColor}" font-family="sans-serif" font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle">
        ${text}
      </text>
    </svg>
  `;

  // Return the SVG content with appropriate headers
  return new NextResponse(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable', // Cache the SVG for a long time
    },
  });
}
