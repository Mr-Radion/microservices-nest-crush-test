import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private httpService: HttpService,
  ) {}
  @Get()
  all() {
    return this.productService.all();
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
    const product = await this.productService.findOne(id);
    this.httpService
      .post(`http://localhost:5000/api/product/${id}/like`, {})
      .subscribe((res) => console.log(res));
    return this.productService.update(id, {
      likes: product.likes + 1,
    });
  }

  @EventPattern('hello')
  async hello(data: string) {
    console.log(data);
  }

  @EventPattern('product_created')
  async productCreated(product: any) {
    await this.productService.create({
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
    console.log(product);
  }

  @EventPattern('product_updated')
  async productUpdated(product: any) {
    await this.productService.update(product.id, {
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
    console.log(product);
  }

  @EventPattern('product_deleted')
  async productDeleted(product: any) {
    await this.productService.delete(product.id);
    console.log(product);
  }
}
