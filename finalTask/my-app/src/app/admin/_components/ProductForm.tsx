"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import Image from "next/image"
import { addProduct, updateProduct } from "../products/_actions/products"

export function ProductForm({ product }: { product?: Product | null }) {
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  )
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  )

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        action={action}
        className="space-y-8 p-8 bg-black border border-white rounded-md w-full max-w-3xl"
      >
        <div className="space-y-2">
          <Label htmlFor="name" className="font-semibold text-white">
            Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={product?.name || ""}
            className="bg-black text-white border border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
          />
          {error.name && (
            <div className="text-destructive text-sm text-white">
              {error.name}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="priceInCents" className="font-semibold text-white">
            Price In Cents
          </Label>
          <Input
            type="number"
            id="priceInCents"
            name="priceInCents"
            required
            value={priceInCents}
            onChange={(e) =>
              setPriceInCents(Number(e.target.value) || undefined)
            }
            className="bg-black text-white border border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
          />
          <div className="text-muted-foreground text-sm text-white">
            {formatCurrency((priceInCents || 0) / 100)}
          </div>
          {error.priceInCents && (
            <div className="text-destructive text-sm text-white">
              {error.priceInCents}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="font-semibold text-white">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            required
            defaultValue={product?.description}
            className="bg-black text-white border border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
          />
          {error.description && (
            <div className="text-destructive text-sm text-white">
              {error.description}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="file" className="font-semibold text-white">
            File
          </Label>
          <Input
            type="file"
            id="file"
            name="file"
            required={product == null}
            className="bg-black text-white border border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
          />
          {product != null && (
            <div className="text-muted-foreground text-sm text-white">
              {product.filePath}
            </div>
          )}
          {error.file && (
            <div className="text-destructive text-sm text-white">{error.file}</div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image" className="font-semibold text-white">
            Image
          </Label>
          <Input
            type="file"
            id="image"
            name="image"
            required={product == null}
            className="bg-black text-white border border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
          />
          {product != null && (
            <Image
              src={product.imagePath}
              height="400"
              width="400"
              alt="Product Image"
              className="rounded-md mt-2"
            />
          )}
          {error.image && (
            <div className="text-destructive text-sm text-white">
              {error.image}
            </div>
          )}
        </div>

        <SubmitButton />
      </form>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full py-2 px-4 text-white rounded-md"
      style={{ backgroundColor: "rgb(238, 75, 43)" }}
    >
      {pending ? "Saving..." : "Save"}
    </Button>
  )
}
