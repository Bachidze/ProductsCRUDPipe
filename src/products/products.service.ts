import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IProducts } from './products.interface';
import { productsDTO } from './products.dto';

@Injectable()
export class ProductsService {
  private products: IProducts[] = [
    {
      id: 1,
      name: 'milk',
      Manufacture: '01/22/2024',
      expiration: '03/20/2025',
    },
    {
      id: 2,
      name: 'Meat',
      Manufacture: '11/11/2024',
      expiration: '03/20/2025',
    },
  ];
  getAllProducts(id: number,key:String): IProducts[] | IProducts {
    if(key !== "UkanUkanOtkutxediAxtomaMrgvali"){
        throw new HttpException("Permission Denied",HttpStatus.UNAUTHORIZED)
    }
    if (id) {
      const res = this.products.filter((el) => el.id === id);
      if (res.length === 0)
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      return res;
    }

    return this.products;
  }

  createProduct(product: productsDTO): IProducts {
    if (!product.name || !product.Manufacture || !product.expiration)
      throw new HttpException(
        'Name,Manufacture and expiration is required',
        HttpStatus.BAD_REQUEST,
      );
    const lastId = this.products[this.products.length - 1]?.id || 0;
    const newProduct = {
      id: lastId + 1,
      createdAt: new Date().toISOString(),
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  getProductsById(id: number) {
    const product = this.products.find((el) => el.id === id);
    if (!product)
      throw new HttpException('Not Found This Expense', HttpStatus.NOT_FOUND);
    return product;
  }

  
  updateProduct(id: number, updateUserDto: productsDTO): IProducts {
    const index = this.products.findIndex(user => user.id === id);
    if (index === -1) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    const updatedUser = { ...this.products[index], ...updateUserDto };
    this.products[index] = updatedUser;
    return updatedUser;
}
}
