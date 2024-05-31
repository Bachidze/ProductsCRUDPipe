import { Body, Controller, Get, Head, Headers, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { productsDTO } from './products.dto';


@Controller('products')
export class ProductsController {
    constructor(private productsServices:ProductsService){
    }
    @Get()
    getAllProducts(@Query("id",new ParseIntPipe({
        errorHttpStatusCode:HttpStatus.NOT_FOUND,
        optional:true
    }))id, @Headers('x-api-key') key:string){
        console.log(key,"Request")
        return this.productsServices.getAllProducts(id,key)
    }
    
    @Post()
    creatProduct(@Body() product:productsDTO){
        return this.productsServices.createProduct(product)
    }

    @Get("/:id")
    getProductsById(@Param("id", ParseIntPipe) id){
        return this.productsServices.getProductsById(id)
    }

    @Put('/:id')
    updateProduct(@Param('id') id, @Body() Product: productsDTO) {
        return this.productsServices.updateProduct(Number(id), Product);
    }
}
