import "./productList.scss";
import Products from "../../components/products/products";
import Newsletter from "../../components/newsletter/newsletter";
import { useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import TuneIcon from '@mui/icons-material/Tune';

const ProductList = () => {
  const [sizeFilter, setSizeFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Event handlers for filter changes
  const handleSizeChange = (event) => {
    setSizeFilter(event.target.value);
  };

  const handleColorChange = (event) => {
    setColorFilter(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrandFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange([0, parseInt(event.target.value)]);
  };

  const clearAllFilters = () => {
    setSizeFilter("");
    setColorFilter("");
    setBrandFilter("");
    setSortOption("");
    setPriceRange([0, 1000]);
  };

  const activeFiltersCount = [sizeFilter, colorFilter, brandFilter].filter(filter => filter !== "").length;

  return (
    <div className="productList-page">
      <div className="productList">
        <div className="container">
          <div className="page-header">
            <div className="breadcrumb">
              <span>Home</span>
              <span className="separator">/</span>
              <span>Men's</span>
              <span className="separator">/</span>
              <span className="current">Shoes</span>
            </div>
            
            <div className="header-content">
              <div className="title-section">
                <h1>Men's Shoes & Sneakers</h1>
                <p>Discover our premium collection of authentic sneakers from top brands</p>
              </div>
              
              <div className="view-controls">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <ViewModuleIcon />
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <ViewListIcon />
                </button>
              </div>
            </div>
          </div>

          <div className="controls-section">
            <div className="controls-header">
              <button 
                className="filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <TuneIcon />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="filter-badge">{activeFiltersCount}</span>
                )}
              </button>

              <div className="results-info">
                <span>Showing premium sneakers</span>
              </div>

              <div className="sort-section">
                <SortIcon className="sort-icon" />
                <select 
                  className="sort-select" 
                  onChange={handleSortChange} 
                  value={sortOption}
                >
                  <option value="">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
            </div>

            <div className={`filter-panel ${showFilters ? 'active' : ''}`}>
              <div className="filter-content">
                <div className="filter-header">
                  <h3>Filter Products</h3>
                  {activeFiltersCount > 0 && (
                    <button className="clear-filters" onClick={clearAllFilters}>
                      Clear All ({activeFiltersCount})
                    </button>
                  )}
                </div>

                <div className="filter-groups">
                  <div className="filter-group">
                    <label className="filter-label">
                      <FilterListIcon />
                      Size
                    </label>
                    <select 
                      className="filter-select" 
                      onChange={handleSizeChange} 
                      value={sizeFilter}
                    >
                      <option value="">All Sizes</option>
                      <option value="7">US 7</option>
                      <option value="7.5">US 7.5</option>
                      <option value="8">US 8</option>
                      <option value="8.5">US 8.5</option>
                      <option value="9">US 9</option>
                      <option value="9.5">US 9.5</option>
                      <option value="10">US 10</option>
                      <option value="10.5">US 10.5</option>
                      <option value="11">US 11</option>
                      <option value="11.5">US 11.5</option>
                      <option value="12">US 12</option>
                      <option value="13">US 13</option>
                      <option value="14">US 14</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label className="filter-label">
                      <div className="color-icon"></div>
                      Color
                    </label>
                    <select 
                      className="filter-select" 
                      onChange={handleColorChange} 
                      value={colorFilter}
                    >
                      <option value="">All Colors</option>
                      <option value="white">White</option>
                      <option value="black">Black</option>
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="gray">Gray</option>
                      <option value="brown">Brown</option>
                      <option value="multicolor">Multicolor</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label className="filter-label">
                      <span className="brand-icon">B</span>
                      Brand
                    </label>
                    <select 
                      className="filter-select" 
                      onChange={handleBrandChange} 
                      value={brandFilter}
                    >
                      <option value="">All Brands</option>
                      <option value="nike">Nike</option>
                      <option value="adidas">Adidas</option>
                      <option value="jordan">Jordan</option>
                      <option value="new-balance">New Balance</option>
                      <option value="puma">Puma</option>
                      <option value="vans">Vans</option>
                      <option value="converse">Converse</option>
                      <option value="yeezy">Yeezy</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label className="filter-label">
                      <span className="price-icon">$</span>
                      Price Range
                    </label>
                    <div className="price-range">
                      <input 
                        type="range" 
                        min="0" 
                        max="1000" 
                        value={priceRange[1]} 
                        onChange={handlePriceRangeChange}
                        className="price-slider"
                      />
                      <div className="price-display">
                        <span>$0</span>
                        <span>${priceRange[1]}+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Products 
        sizeFilter={sizeFilter}
        colorFilter={colorFilter}
        brandFilter={brandFilter}
        sortOption={sortOption}
        priceRange={priceRange}
        viewMode={viewMode}
      />
      
    </div>
  );
};

export default ProductList;
