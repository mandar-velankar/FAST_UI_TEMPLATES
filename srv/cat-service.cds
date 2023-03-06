using com.bayer.SXTENDER.templates as templates from '../db/data-model';

service CatalogService {
    @readonly entity Template as projection on templates.Template;
}