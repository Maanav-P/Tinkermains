
import { useEffect, useState } from 'react'
import './App.css'

const demoStats = [
  { title: 'Total Revenue', value: '₹1,25,000', change: '+12.5%', icon: '₹' },
  { title: 'Active Subscriptions', value: '128', change: '+8.2%', icon: '↗' },
  { title: 'Total Customers', value: '96', change: '+5.4%', icon: '♙' },
  { title: 'Pending Invoices', value: '12', change: 'Needs attention', icon: '▤' },
]

const demoTransactions = [
  { id: 'INV001', customer: 'Rahul Sharma', plan: 'Premium', amount: '₹5,000', status: 'Paid' },
  { id: 'INV002', customer: 'Ananya Nair', plan: 'Basic', amount: '₹999', status: 'Pending' },
  { id: 'INV003', customer: 'Arjun Kumar', plan: 'Pro', amount: '₹2,499', status: 'Paid' },
  { id: 'INV004', customer: 'Meera Das', plan: 'Premium', amount: '₹5,000', status: 'Overdue' },
]

function ProductsPage({
  products,
  setProducts,
  searchTerm,
  setSearchTerm,
  showProductForm,
  setShowProductForm,
  newProduct,
  setNewProduct,
}) {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function addProduct(event) {
    event.preventDefault()

    if (!newProduct.name.trim() || !newProduct.price || Number(newProduct.price) <= 0) {
      return
    }

    setProducts([
      ...products,
      {
        id: Date.now(),
        name: newProduct.name.trim(),
        category: newProduct.category,
        price: Number(newProduct.price),
        status: 'Active',
      },
    ])

    setNewProduct({ name: '', category: 'Software', price: '' })
    setShowProductForm(false)
  }

  return (
    <section className="products-page">
      <div className="products-toolbar">
        <input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <button onClick={() => setShowProductForm(!showProductForm)}>
          + Add Product
        </button>
      </div>

      {showProductForm && (
        <form className="panel product-form" onSubmit={addProduct}>
          <h3>Add New Product</h3>

          <input
            placeholder="Product name"
            value={newProduct.name}
            onChange={(event) =>
              setNewProduct({ ...newProduct, name: event.target.value })
            }
            required
          />

          <select
            value={newProduct.category}
            onChange={(event) =>
              setNewProduct({ ...newProduct, category: event.target.value })
            }
          >
            <option>Software</option>
            <option>Cloud</option>
            <option>Service</option>
          </select>

          <input
            type="number"
            min="1"
            placeholder="Price (₹)"
            value={newProduct.price}
            onChange={(event) =>
              setNewProduct({ ...newProduct, price: event.target.value })
            }
            required
          />

          <button type="submit">Save Product</button>
          <button type="button" onClick={() => setShowProductForm(false)}>
            Cancel
          </button>
        </form>
      )}

      <div className="panel transactions-panel">
        <div className="panel-heading">
          <div>
            <h3>Product List</h3>
            <p>{filteredProducts.length} products found</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price.toLocaleString('en-IN')}</td>
                  <td>
                    <span className={`badge ${product.status.toLowerCase()}`}>
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="4">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function PlansPage({ plans, setPlans, planSearch, setPlanSearch, showPlanForm, setShowPlanForm, newPlan, setNewPlan }) {
  const filteredPlans = plans.filter(plan =>
    plan.name.toLowerCase().includes(planSearch.toLowerCase())
  )

  function addPlan(event) {
    event.preventDefault()
    if (!newPlan.name.trim() || !newPlan.price || Number(newPlan.price) <= 0) return

    setPlans([...plans, {
      id: Date.now(),
      name: newPlan.name.trim(),
      price: Number(newPlan.price),
      cycle: newPlan.cycle,
      status: 'Active',
    }])

    setNewPlan({ name: '', price: '', cycle: 'Monthly' })
    setShowPlanForm(false)
  }

  return (
    <section className="products-page">
      <div className="products-toolbar">
        <input
          placeholder="Search plans..."
          value={planSearch}
          onChange={e => setPlanSearch(e.target.value)}
        />
        <button onClick={() => setShowPlanForm(!showPlanForm)}>
          + Add Plan
        </button>
      </div>

      {showPlanForm && (
        <form className="panel product-form" onSubmit={addPlan}>
          <h3>Create New Plan</h3>
          <input
            placeholder="Plan name"
            value={newPlan.name}
            onChange={e => setNewPlan({ ...newPlan, name: e.target.value })}
            required
          />
          <input
            type="number"
            min="1"
            placeholder="Price (₹)"
            value={newPlan.price}
            onChange={e => setNewPlan({ ...newPlan, price: e.target.value })}
            required
          />
          <select
            value={newPlan.cycle}
            onChange={e => setNewPlan({ ...newPlan, cycle: e.target.value })}
          >
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
          <button type="submit">Save Plan</button>
          <button type="button" onClick={() => setShowPlanForm(false)}>Cancel</button>
        </form>
      )}

      <div className="panel transactions-panel">
        <div className="panel-heading">
          <div>
            <h3>Subscription Plans</h3>
            <p>{filteredPlans.length} plans available</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Price</th>
                <th>Billing Cycle</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.name}</td>
                  <td>₹{plan.price.toLocaleString('en-IN')}</td>
                  <td>{plan.cycle}</td>
                  <td><span className="badge paid">{plan.status}</span></td>
                </tr>
              ))}
              {filteredPlans.length === 0 && (
                <tr><td colSpan="4">No plans found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [products, setProducts] = useState([
  { id: 1, name: 'Brightloop CRM', category: 'Software', price: 4999, status: 'Active' },
  { id: 2, name: 'Cloud Storage', category: 'Cloud', price: 1999, status: 'Active' },
  { id: 3, name: 'Analytics Suite', category: 'Software', price: 2999, status: 'Inactive' },
])

const [searchTerm, setSearchTerm] = useState('')
const [showProductForm, setShowProductForm] = useState(false)
const [newProduct, setNewProduct] = useState({
  name: '',
  category: 'Software',
  price: '',
})
const [plans, setPlans] = useState([
  { id: 1, name: 'Basic', price: 999, cycle: 'Monthly', status: 'Active' },
  { id: 2, name: 'Pro', price: 2499, cycle: 'Monthly', status: 'Active' },
  { id: 3, name: 'Premium', price: 5000, cycle: 'Yearly', status: 'Active' },
])

const [planSearch, setPlanSearch] = useState('')
const [showPlanForm, setShowPlanForm] = useState(false)
const [newPlan, setNewPlan] = useState({
  name: '',
  price: '',
  cycle: 'Monthly',
})
  const [stats, setStats] = useState(demoStats)
  const [transactions, setTransactions] = useState(demoTransactions)
  const [dataSource, setDataSource] = useState('Demo data')
  const [loading, setLoading] = useState(false)

  // Connect to the backend when its URL is added to the .env file.
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL

    if (!apiUrl) return

    async function loadDashboard() {
      setLoading(true)

      try {
        const response = await fetch(`${apiUrl}/api/dashboard`)

        if (!response.ok) {
          throw new Error('Could not load dashboard')
        }

        const data = await response.json()

        setStats([
          { title: 'Total Revenue', value: `₹${Number(data.totalRevenue).toLocaleString('en-IN')}`, change: data.revenueChange || '', icon: '₹' },
          { title: 'Active Subscriptions', value: data.activeSubscriptions, change: data.subscriptionChange || '', icon: '↗' },
          { title: 'Total Customers', value: data.totalCustomers, change: data.customerChange || '', icon: '♙' },
          { title: 'Pending Invoices', value: data.pendingInvoices, change: 'Needs attention', icon: '▤' },
        ])

        if (data.recentTransactions) {
          setTransactions(data.recentTransactions)
        }

        setDataSource('Live data')
      } catch (error) {
        console.error('Dashboard API error:', error)
        setDataSource('Demo data — API unavailable')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const menuItems = [
    { name: 'Dashboard', icon: '▦' },
    { name: 'Products', icon: '📦' },
    { name: 'Plans', icon: '◇' },
    { name: 'Subscriptions', icon: '🔄' },
    { name: 'Invoices', icon: '📄' },
    { name: 'Payments', icon: '💳' },
    { name: 'Reports', icon: '📊' },
  ]

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">B</div>
          <div>
            <h2>Brightloop</h2>
            <span>SUBSCRIPTION HUB</span>
          </div>
        </div>

        <p className="menu-heading">MAIN MENU</p>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${activePage === item.name ? 'active' : ''}`}
              onClick={() => setActivePage(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="admin-profile">
            <div className="avatar">A</div>
            <div>
              <strong>Admin User</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h2>{activePage}</h2>
            <p>Welcome back! Here's what's happening today.</p>
          </div>

          <div className="topbar-right">
            <span className="notification">♧</span>
            <div className="top-avatar">A</div>
          </div>
        </header>

        {activePage === 'Plans' ? (
  <PlansPage
    plans={plans}
    setPlans={setPlans}
    planSearch={planSearch}
    setPlanSearch={setPlanSearch}
    showPlanForm={showPlanForm}
    setShowPlanForm={setShowPlanForm}
    newPlan={newPlan}
    setNewPlan={setNewPlan}
  />
) : activePage === 'Products' ? (
  <ProductsPage
    products={products}
    setProducts={setProducts}
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    showProductForm={showProductForm}
    setShowProductForm={setShowProductForm}
    newProduct={newProduct}
    setNewProduct={setNewProduct}
  />
) : activePage === 'Dashboard' ? (
          <>
            <p className="data-status">
              {loading ? 'Loading dashboard...' : dataSource}
            </p>

            <section className="stats-grid">
              {stats.map((stat) => (
                <div className="stat-card" key={stat.title}>
                  <div className="stat-top">
                    <span>{stat.title}</span>
                    <div className="stat-icon">{stat.icon}</div>
                  </div>
                  <h2>{stat.value}</h2>
                  <p className="stat-change">{stat.change}</p>
                </div>
              ))}
            </section>

            <section className="dashboard-grid">
              <div className="panel revenue-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Revenue Overview</h3>
                    <p>Your revenue performance</p>
                  </div>
                  <select>
                    <option>Last 6 months</option>
                    <option>Last 12 months</option>
                  </select>
                </div>

                <div className="revenue-number">
                  {stats[0].value}
                  <span> {stats[0].change}</span>
                </div>

                <div className="chart">
                  {[35, 55, 42, 75, 60, 90].map((height, index) => (
                    <div className="chart-column" key={index}>
                      <div
                        className="chart-bar"
                        style={{ height: `${height}%` }}
                      />
                      <span>
                        {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel subscription-panel">
                <h3>Subscription Summary</h3>
                <p>Current subscription status</p>

                <div className="summary-item">
                  <span className="status-dot green"></span>
                  Active
                  <strong>{stats[1].value}</strong>
                </div>

                <div className="summary-item">
                  <span className="status-dot yellow"></span>
                  Pending
                  <strong>{stats[3].value}</strong>
                </div>

                <div className="summary-item">
                  <span className="status-dot red"></span>
                  Expired
                  <strong>8</strong>
                </div>
              </div>
            </section>

            <section className="panel transactions-panel">
              <div className="panel-heading">
                <div>
                  <h3>Recent Transactions</h3>
                  <p>Latest invoice and payment activity</p>
                </div>
                <button
                  className="view-button"
                  onClick={() => setActivePage('Invoices')}
                >
                  View All →
                </button>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Invoice ID</th>
                      <th>Customer</th>
                      <th>Plan</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactions.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.customer}</td>
                        <td>{item.plan}</td>
                        <td>{item.amount}</td>
                        <td>
                          <span className={`badge ${item.status.toLowerCase()}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          <section className="panel placeholder-panel">
            <h2>{activePage}</h2>
            <p>
              The {activePage.toLowerCase()} module will be connected here.
            </p>
            <span>Module under development</span>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
