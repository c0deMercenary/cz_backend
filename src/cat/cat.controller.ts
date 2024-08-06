import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, HttpStatus, ParseIntPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { RoleGuard } from './role.guard';
import { Roles } from './roles.decorator';

@Controller('cats')
@UseGuards(RoleGuard)
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  @SetMetadata('roles', ['admin'])
  create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }
  
  @Get()
  async findAll() {
    try {
      await this.catService.findAll()
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      })
    }
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string) {
    return this.catService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catService.remove(+id);
  }
}
