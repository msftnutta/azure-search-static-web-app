import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// Import isolation styles instead of regular CSS
import './FacetIsolation.css';

// Using lightweight styled components instead of MUI components
const FacetListItem = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 16px 8px 32px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const FacetValueItem = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '4px 16px 4px 48px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const FacetList = styled('ul')(() => ({
  maxHeight: '340px',
  overflowY: 'auto',
  paddingRight: '16px',
  margin: 0,
  listStyle: 'none',
}));

// Custom checkbox component
const CustomCheckbox = styled('div')(({ checked }) => ({
  width: '18px',
  height: '18px',
  border: checked ? '2px solid #1976d2' : '2px solid rgba(0, 0, 0, 0.6)',
  borderRadius: '2px',
  marginRight: '8px',
  position: 'relative',
  backgroundColor: checked ? '#1976d2' : 'transparent',
  '&::after': checked ? {
    content: '""',
    position: 'absolute',
    left: '4px',
    top: '1px',
    width: '6px',
    height: '10px',
    border: 'solid white',
    borderWidth: '0 2px 2px 0',
    transform: 'rotate(45deg)',
  } : {},
}));

// Lightweight expand/collapse icons
const ExpandIcon = ({ expanded }) => (
  <div style={{ 
    width: '24px', 
    height: '24px', 
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',
    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s',
  }}>
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path 
        fill="currentColor" 
        d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
      />
    </svg>
  </div>
);

export default function CheckboxFacet(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const checkboxes = props.values.map(facetValue => {
        let isSelected = props.selectedFacets.some(facet => facet.value === facetValue.value);
        
        const handleClick = () => {
            if (isSelected) {
                props.removeFilter({field: props.name, value: facetValue.value});
            } else {
                props.addFilter(props.name, facetValue.value);
            }
        };
        
        return (
            <li key={facetValue.value}>
                <FacetValueItem
                    id={facetValue.value}
                    onClick={handleClick}
                >
                    <CustomCheckbox checked={isSelected} />
                    <span style={{ 
                        fontSize: '0.875rem',
                        fontFamily: 'Roboto, Arial, sans-serif'
                    }}>
                        {`${facetValue.value} (${facetValue.count})`}
                    </span>
                </FacetValueItem>
            </li>
        );
    });

    // Simple animation styles for collapse effect
    const collapseStyle = {
        maxHeight: isExpanded ? '1000px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease-in-out',
    };

    return (
        <Box className="mui-facet-isolation-wrapper">
            <FacetListItem 
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ fontWeight: 500 }}
            >
                <span style={{ 
                    fontWeight: 500,
                    fontFamily: 'Roboto, Arial, sans-serif'
                }}>
                    {props.mapFacetName(props.name)}
                </span>
                <ExpandIcon expanded={isExpanded} />
            </FacetListItem>
            <div style={collapseStyle}>
                <FacetList>
                    {checkboxes}
                </FacetList>
            </div>
        </Box>
    );
}