"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingCart, Search, Download, Eye } from "lucide-react"

interface Order {
  id: string
  orderNumber: string
  customerEmail: string
  minecraftUsername: string
  date: string
  items: {
    title: string
    category: string
    price: number
    quantity: number
  }[]
  total: number
  status: "completed" | "pending" | "failed" | "refunded"
  paymentMethod: string
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "MC-789123",
    customerEmail: "player1@example.com",
    minecraftUsername: "CraftMaster2024",
    date: "2024-12-20",
    items: [
      { title: "Diamond Rank", category: "rank", price: 49.99, quantity: 1 },
      { title: "Legendary Crate Key", category: "key", price: 24.99, quantity: 2 },
    ],
    total: 99.97,
    status: "completed",
    paymentMethod: "PayPal",
  },
  {
    id: "2",
    orderNumber: "MC-456789",
    customerEmail: "player2@example.com",
    minecraftUsername: "BlockBuilder",
    date: "2024-12-19",
    items: [{ title: "Premium Unban", category: "unban", price: 19.99, quantity: 1 }],
    total: 19.99,
    status: "pending",
    paymentMethod: "Credit Card",
  },
  {
    id: "3",
    orderNumber: "MC-123456",
    customerEmail: "player3@example.com",
    minecraftUsername: "EnderSlayer",
    date: "2024-12-18",
    items: [
      { title: "Elite Rank", category: "rank", price: 34.99, quantity: 1 },
      { title: "Epic Crate Key", category: "key", price: 14.99, quantity: 3 },
    ],
    total: 79.96,
    status: "completed",
    paymentMethod: "GCash",
  },
  {
    id: "4",
    orderNumber: "MC-987654",
    customerEmail: "player4@example.com",
    minecraftUsername: "RedstoneWiz",
    date: "2024-12-17",
    items: [{ title: "Mythic Crate Key", category: "key", price: 39.99, quantity: 1 }],
    total: 39.99,
    status: "failed",
    paymentMethod: "Apple Pay",
  },
]

export default function AdminOrdersPage() {
  const { state } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  useEffect(() => {
    if (!state.isAuthenticated && !state.isLoading) {
      router.push("/login")
    } else if (state.isAuthenticated && state.user?.role !== "admin") {
      router.push("/dashboard")
    }
  }, [state.isAuthenticated, state.isLoading, state.user?.role, router])

  useEffect(() => {
    let filtered = orders

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.minecraftUsername.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date()
      const filterDate = new Date()

      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0)
          break
        case "week":
          filterDate.setDate(now.getDate() - 7)
          break
        case "month":
          filterDate.setMonth(now.getMonth() - 1)
          break
      }

      filtered = filtered.filter((order) => new Date(order.date) >= filterDate)
    }

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter, dateFilter])

  if (!state.user || state.user.role !== "admin") {
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-500"
      case "pending":
        return "bg-yellow-500/20 text-yellow-500"
      case "failed":
        return "bg-red-500/20 text-red-500"
      case "refunded":
        return "bg-blue-500/20 text-blue-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const totalRevenue = filteredOrders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => sum + order.total, 0)

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Order Management</h1>
              <p className="text-muted-foreground">View and manage all customer orders</p>
            </div>
            <Button className="gradient-primary text-white hover-glow">
              <Download className="w-4 h-4 mr-2" />
              Export Orders
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Total Orders</p>
                  <p className="text-2xl font-bold text-white">{filteredOrders.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Completed</p>
                  <p className="text-2xl font-bold text-green-500">
                    {filteredOrders.filter((o) => o.status === "completed").length}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Pending</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {filteredOrders.filter((o) => o.status === "pending").length}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Revenue</p>
                  <p className="text-2xl font-bold text-primary">${totalRevenue.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="glass border-white/20 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by order number, email, or username..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent pl-10"
                    />
                  </div>
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="glass border-white/20 text-white bg-transparent w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="glass border-white/20 bg-black/90 backdrop-blur-xl">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="glass border-white/20 text-white bg-transparent w-full md:w-48">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent className="glass border-white/20 bg-black/90 backdrop-blur-xl">
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <span>Orders ({filteredOrders.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/20">
                    <TableHead className="text-white">Order</TableHead>
                    <TableHead className="text-white">Customer</TableHead>
                    <TableHead className="text-white">Items</TableHead>
                    <TableHead className="text-white">Total</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Date</TableHead>
                    <TableHead className="text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="border-white/20">
                      <TableCell>
                        <div>
                          <p className="text-white font-semibold">{order.orderNumber}</p>
                          <p className="text-muted-foreground text-sm">{order.paymentMethod}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-white">{order.minecraftUsername}</p>
                          <p className="text-muted-foreground text-sm">{order.customerEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="text-sm">
                              <span className="text-white">
                                {item.quantity}x {item.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-white font-bold">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-white">{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
