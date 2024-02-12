import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'products'})
export class Product {

    @ApiProperty({
        example: '06b424ea-5cdd-4f3c-9ea7-476894bc61a7',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @ApiProperty({
        example: 0,
        description: 'Product price'
    })
    @Column('text', { unique: true })
    title: string

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Product Ttitle',
        uniqueItems: true
    })
    @Column('float', { default: 0 })
    price: number;

    @ApiProperty({
        example: 'Cupidatat amet nostrud deserunt fugiat.',
        description: 'Product description',
        default: null
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        example: 't-shirt_teslo',
        description: 'Product SLUG - for SEO',
        uniqueItems: true
    })
    @Column('text', { unique: true })
    slug: string

    @ApiProperty({
        example: 10,
        description: 'Product stuck',
        default: 0
    })
    @Column('int', { default: 0 })
    stock: number;

    @ApiProperty({
        example: ['S', 'M', 'L'],
        description: 'Product sizes',
        default: 0
    })
    @Column('text', { array: true })
    sizes: string[]

    @ApiProperty({
        example: 'women',
        description: 'Product gender',
        default: 0
    })
    @Column('text')
    gender: string;

    @Column('text', {
        array: true,
        default: []
    })
    tags: string[]

    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product, 
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        (user) => user.product,
        { eager : true }
    )
    user: User

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title;
        }

        this.slug = this.slug
            .toLocaleLowerCase()
            .replaceAll(' ', '')
            .replaceAll("'", '')
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLocaleLowerCase()
            .replaceAll(' ', '')
            .replaceAll("'", '')
    }
    //tags
    //images
}
