import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy, // подключаем прокси для взаимодействия между сервисами
  ) {}

  @Get()
  all() {
    this.client.emit('hello', 'Hi there!'); // инициализируем EventPattern hello по которому поймаем данные в других сервисах
    return this.productService.all();
  }

  @Post()
  async create(@Body('title') title: string, @Body() image: number) {
    const product = this.productService.create({ title, image });
    this.client.emit('product_created', product);
    return product;
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.productService.get(id);
  }

  @Put()
  async update(@Param('id') id: number, @Body('title') title: string, @Body() image: number) {
    await this.productService.update(id, { title, image });
    const product = await this.productService.get(id);
    this.client.emit('product_updated', product);
    return product;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.productService.delete(id);
    this.client.emit('product_deleted', id);
    return;
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
    const product = await this.productService.get(id);

    return this.productService.update(id, {
      likes: product.likes + 1,
    });
  }
}
