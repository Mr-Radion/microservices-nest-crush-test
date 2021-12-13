import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  all(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOne({ id });
  }

  create(data): Promise<ProductEntity> {
    return this.productRepository.save(data);
  }

  update(id, data): Promise<any> {
    return this.productRepository.update(id, data);
  }

  delete(id: number): Promise<any> {
    return this.productRepository.delete(id);
  }
}
