import { Get, Render, Controller } from 'routing-controllers';
import { FsDomainController } from './FsDomainController';

@Controller('/xmlcurl')
export class XmlCurlController {    

    fsDomainController:FsDomainController;

    constructor(){
        this.fsDomainController = new FsDomainController();
    }
    

    @Get("/directory")
    @Render("xmlcurl/directory.pug")
    async directory() {     
        let domains = await this.fsDomainController.getAll();    
        return {domains:domains};
    }
    @Get("/directory/section")
    @Render("xmlcurl/directory-section.pug")
    async directorySection() {     
        let domains = await this.fsDomainController.getAll();    
        return {domains:domains};
    }
}