import { Get, Render, Controller } from 'routing-controllers';
import { FsDomainController } from './FsDomainController';
import { FsSofiaController } from './FsSofiaController';
import { FsModuleController } from './FsModuleController';

@Controller('/xmlcurl')
export class XmlCurlController {    

    fsDomainController:FsDomainController;
    sofiaController:FsSofiaController;
    fsModuleController:FsModuleController;

    constructor(){
        this.fsDomainController = new FsDomainController();
        this.sofiaController = new FsSofiaController();
        this.fsModuleController = new FsModuleController();
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

    @Get("/configuration/sofia")
    @Render("xmlcurl/sofia.pug")
    async sofiaConf() {
        let sofia = await this.fsModuleController.getByName('sofia');      
        let profiles = await this.sofiaController.getProfiles();    
        return {settings:sofia.settings,profiles:profiles};
    }
}