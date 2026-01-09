import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ScriptsService } from './scripts.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateScriptDto } from './dto/create-script.dto';

@Controller('scripts')
export class ScriptsController {
  constructor(private scriptsService: ScriptsService) {}

  @Get()
  getAll() { return this.scriptsService.findAll(); }

  @Get('seed')
  seed() { return this.scriptsService.seedGenres(); }

  @Get('genres')
  getGenres() { return this.scriptsService.getAllGenres(); }

  @Post('genres')
  addGenre(@Body('name') name: string) { return this.scriptsService.createGenre(name); }


  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateScriptDto, @Request() req) {
    return this.scriptsService.create(dto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateScriptDto, @Request() req) {
    return this.scriptsService.update(id, dto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-scripts')
  getMyScripts(@Request() req) {
    return this.scriptsService.findByWriter(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteScript(@Param('id') id: number, @Request() req) {
    return this.scriptsService.remove(id, req.user.userId);
  }
}