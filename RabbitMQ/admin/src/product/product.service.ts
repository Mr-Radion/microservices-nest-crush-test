import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
  ) {}

  all(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  create(data: Object): Promise<ProductEntity> {
    return this.productRepository.save(data);
  }

  get(id: number) {
    return this.productRepository.findOne({ id });
  }

  update(id: number, data: Object): Promise<any> {
    return this.productRepository.update(id, data);
  }

  delete(id: number): Promise<any> {
    return this.productRepository.delete(id);
  }
}
