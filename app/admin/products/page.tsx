"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, Plus, Edit, Trash2, Star, Eye, EyeOff } from "lucide-react"

interface Product {
  id: string
  title: string
  category: "rank" | "key" | "unban"
  price: number
  originalPrice?: number
  description: string
  image: string
  featured: boolean
  visible: boolean
  commands: string[]
  sales: number
}

const mockProducts: Product[] = [
  {
    id: "1",
    title: "Diamond Rank",
    category: "rank",
    price: 49.99,
    originalPrice: 69.99,
    description: "Top-tier rank with god mode, unlimited homes, and diamond exclusive perks.",
    image: "/minecraft-diamond-rank-badge.png",
    featured: true,
    visible: true,
    commands: ["lp user {player} parent set diamond", "give {player} diamond 64"],
    sales: 156,
  },
  {
    id: "2",
    title: "Legendary Crate Key",
    category: "key",
    price: 24.99,
    description: "Open legendary crates for the rarest items and mythic equipment.",
    image: "/minecraft-legendary-crate-key.png",
    featured: false,
    visible: true,
    commands: ["crates give {player} legendary 1"],
    sales: 89,
  },
  {
    id: "3",
    title: "Premium Unban",
    category: "unban",
    price: 19.99,
    description: "Fast-track unban service for moderate violations.",
    image: "/minecraft-unban-service.png",
    featured: false,
    visible: true,
    commands: ["unban {player}", "tempban {player} 0s Unbanned via store"],
    sales: 67,
  },
]

export default function AdminProductsPage() {
  const { state } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    category: "rank" as "rank" | "key" | "unban",
    price: "",
    originalPrice: "",
    description: "",
    image: "",
    commands: "",
  })

  useEffect(() => {
    if (!state.isAuthenticated && !state.isLoading) {
      router.push("/login")
    } else if (state.isAuthenticated && state.user?.role !== "admin") {
      router.push("/dashboard")
    }
  }, [state.isAuthenticated, state.isLoading, state.user?.role, router])

  if (!state.user || state.user.role !== "admin") {
    return null
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      title: "",
      category: "rank",
      price: "",
      originalPrice: "",
      description: "",
      image: "",
      commands: "",
    })
    setEditingProduct(null)
  }

  const handleCreateProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.category,
      price: Number.parseFloat(formData.price),
      originalPrice: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : undefined,
      description: formData.description,
      image: formData.image || "/placeholder.svg",
      featured: false,
      visible: true,
      commands: formData.commands.split("\n").filter((cmd) => cmd.trim()),
      sales: 0,
    }

    setProducts((prev) => [...prev, newProduct])
    setIsCreateDialogOpen(false)
    resetForm()
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      title: product.title,
      category: product.category,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      description: product.description,
      image: product.image,
      commands: product.commands.join("\n"),
    })
    setIsCreateDialogOpen(true)
  }

  const handleUpdateProduct = () => {
    if (!editingProduct) return

    const updatedProduct: Product = {
      ...editingProduct,
      title: formData.title,
      category: formData.category,
      price: Number.parseFloat(formData.price),
      originalPrice: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : undefined,
      description: formData.description,
      image: formData.image || "/placeholder.svg",
      commands: formData.commands.split("\n").filter((cmd) => cmd.trim()),
    }

    setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? updatedProduct : p)))
    setIsCreateDialogOpen(false)
    resetForm()
  }

  const toggleFeatured = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)))
  }

  const toggleVisibility = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p)))
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Product Management</h1>
              <p className="text-muted-foreground">Create, edit, and manage your store products</p>
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-primary text-white hover-glow" onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="glass border-white/20 bg-black/90 backdrop-blur-xl max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingProduct ? "Edit Product" : "Create New Product"}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Product Title</Label>
                      <Input
                        placeholder="Enter product title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="glass border-white/20 text-white bg-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass border-white/20 bg-black/90 backdrop-blur-xl">
                          <SelectItem value="rank">Rank</SelectItem>
                          <SelectItem value="key">Crate Key</SelectItem>
                          <SelectItem value="unban">Unban Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Price ($)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Original Price (Optional)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.originalPrice}
                        onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                        className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Description</Label>
                    <Textarea
                      placeholder="Enter product description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Image URL</Label>
                    <Input
                      placeholder="Enter image URL"
                      value={formData.image}
                      onChange={(e) => handleInputChange("image", e.target.value)}
                      className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Minecraft Commands (one per line)</Label>
                    <Textarea
                      placeholder="lp user {player} parent set rank&#10;give {player} item 64"
                      value={formData.commands}
                      onChange={(e) => handleInputChange("commands", e.target.value)}
                      className="glass border-white/20 text-white placeholder:text-muted-foreground bg-transparent resize-none"
                      rows={4}
                    />
                    <p className="text-muted-foreground text-xs">
                      Use {"{player}"} as placeholder for the player's username
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={editingProduct ? handleUpdateProduct : handleCreateProduct}
                      className="gradient-primary text-white hover-glow"
                      disabled={!formData.title || !formData.price || !formData.description}
                    >
                      {editingProduct ? "Update Product" : "Create Product"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                      className="glass border-white/20 text-white hover:bg-white/20 bg-transparent"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Package className="w-5 h-5 text-primary" />
                <span>All Products ({products.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/20">
                    <TableHead className="text-white">Product</TableHead>
                    <TableHead className="text-white">Category</TableHead>
                    <TableHead className="text-white">Price</TableHead>
                    <TableHead className="text-white">Sales</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} className="border-white/20">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="text-white font-semibold">{product.title}</p>
                            <p className="text-muted-foreground text-sm truncate max-w-xs">{product.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            product.category === "rank"
                              ? "bg-primary/20 text-primary"
                              : product.category === "key"
                                ? "bg-secondary/20 text-secondary"
                                : "bg-accent/20 text-accent"
                          }
                        >
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-white">
                          ${product.price}
                          {product.originalPrice && (
                            <span className="text-muted-foreground line-through ml-2">${product.originalPrice}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-white">{product.sales}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {product.featured && <Badge className="bg-yellow-500/20 text-yellow-500">Featured</Badge>}
                          <Badge
                            className={
                              product.visible ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                            }
                          >
                            {product.visible ? "Visible" : "Hidden"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleFeatured(product.id)}
                            className="text-yellow-500 hover:bg-yellow-500/20"
                          >
                            <Star className={`w-4 h-4 ${product.featured ? "fill-current" : ""}`} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleVisibility(product.id)}
                            className="text-blue-500 hover:bg-blue-500/20"
                          >
                            {product.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditProduct(product)}
                            className="text-white hover:bg-white/20"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteProduct(product.id)}
                            className="text-red-500 hover:bg-red-500/20"
                          >
                            <Trash2 className="w-4 h-4" />
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
