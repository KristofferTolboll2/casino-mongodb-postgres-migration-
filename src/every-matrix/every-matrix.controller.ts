import { Controller } from '@nestjs/common';
import { EveryMatrixService } from './every-matrix.service';

@Controller('every-matrix')
export class EveryMatrixController {
  constructor(private readonly everyMatrixService: EveryMatrixService) {}
}
