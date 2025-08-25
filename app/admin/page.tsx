"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DollarSign, Users, Package, TrendingUp, ShoppingCart, Crown, Calendar, Eye, Settings } from "lucide-react"
import Link from "next/link"

// Mock analytics data
const revenueData = [
  { month: "Jan", revenue: 4200, orders: 45 },
  { month: "Feb", revenue: 5800, orders: 62 },
  { month: "Mar", revenue: 7200, orders: 78 },
  { month: "Apr", revenue: 6900, orders: 71 },
  { month: "May", revenue: 8400, orders: 89 },
  { month: "Jun", revenue: 9200, orders: 95 },
]

const topProducts = [
  { name: "Diamond Rank", sales: 156, revenue: 7794, color: "#1e90ff" },
  { name: "Legendary Keys", sales: 89, revenue: 2223, color: "#663399" },
  { name: "Premium Unban", sales: 67, revenue: 1339, color: "#9b59b6" },
  { name: "Elite Rank", sales: 45, revenue: 1575, color: "#00cfff" },
]

const categoryData = [
  { name: "Ranks", value: 65, color: "#1e90ff" },
  { name: "Keys", value: 25, color: "#663399" },
  { name: "Unbans", value: 10, color: "#9b59b6" },
]

export default function AdminDashboardPage() {
  const { state } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!state.isAuthenticated && !state.isLoading) {
      router.push("/login")
    } else if (state.isAuthenticated && state.user?.role !== "admin") {
      router.push("/dashboard")
    }
  }, [state.isAuthenticated, state.isLoading, state.user?.role, router])

  if (state.isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    )
  }

  if (!state.user || state.user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your Minecraft server store</p>
            </div>
            <Badge className="gradient-primary text-white px-4 py-2">
              <Crown className="w-4 h-4 mr-2" />
              Administrator
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-white">$42,847</p>
                    <p className="text-green-500 text-sm">+12.5% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-white">1,247</p>
                    <p className="text-green-500 text-sm">+8.2% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Active Players</p>
                    <p className="text-2xl font-bold text-white">3,456</p>
                    <p className="text-green-500 text-sm">+15.3% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Products Sold</p>
                    <p className="text-2xl font-bold text-white">2,891</p>
                    <p className="text-green-500 text-sm">+6.7% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Chart */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Revenue Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "8px",
                        color: "white",
                      }}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#1e90ff" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Package className="w-5 h-5 text-primary" />
                  <span>Sales by Category</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "8px",
                        color: "white",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top Products */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-primary" />
                  <span>Top Selling Products</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: product.color }} />
                        <div>
                          <p className="text-white font-semibold">{product.name}</p>
                          <p className="text-muted-foreground text-sm">{product.sales} sales</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-primary font-bold">${product.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/admin/products">
                  <Button className="w-full justify-start glass border-white/20 text-white hover:bg-white/20 bg-transparent">
                    <Package className="w-4 h-4 mr-3" />
                    Manage Products
                  </Button>
                </Link>

                <Link href="/admin/orders">
                  <Button className="w-full justify-start glass border-white/20 text-white hover:bg-white/20 bg-transparent">
                    <ShoppingCart className="w-4 h-4 mr-3" />
                    View Orders
                  </Button>
                </Link>

                <Link href="/admin/players">
                  <Button className="w-full justify-start glass border-white/20 text-white hover:bg-white/20 bg-transparent">
                    <Users className="w-4 h-4 mr-3" />
                    Player Insights
                  </Button>
                </Link>

                <Link href="/admin/analytics">
                  <Button className="w-full justify-start glass border-white/20 text-white hover:bg-white/20 bg-transparent">
                    <TrendingUp className="w-4 h-4 mr-3" />
                    Advanced Analytics
                  </Button>
                </Link>

                <Button className="w-full justify-start glass border-white/20 text-white hover:bg-white/20 bg-transparent">
                  <Eye className="w-4 h-4 mr-3" />
                  View Store
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-white text-sm">New order #MC-789456 - Diamond Rank purchased</p>
                    <p className="text-muted-foreground text-xs">2 minutes ago</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-500">$49.99</Badge>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-white text-sm">Player CraftMaster2024 registered</p>
                    <p className="text-muted-foreground text-xs">15 minutes ago</p>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-500">New User</Badge>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-white text-sm">Unban request submitted for player BlockBuilder</p>
                    <p className="text-muted-foreground text-xs">1 hour ago</p>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-500">Pending</Badge>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-white text-sm">5x Legendary Crate Keys sold to EnderSlayer</p>
                    <p className="text-muted-foreground text-xs">3 hours ago</p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-500">$124.95</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
