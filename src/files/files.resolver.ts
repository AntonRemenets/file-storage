import { Resolver } from '@nestjs/graphql'
import { FilesService } from './files.service'

@Resolver('files')
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}
}
