'use client';

import { brand } from '@/content/brand';

interface FooterProps {
  copy: {
    footer: {
      rights: string;
      description: string;
      sections: {
        contact: string;
        services: string;
        location: string;
        bot: string;
      };
      whatsapp: string;
      services_list: {
        n8n: string;
        chatbots: string;
        qa: string;
        llm: string;
      };
      location_info: {
        city: string;
        remote: string;
      };
      made_with: string;
    };
  };
}

export default function Footer({ copy }: FooterProps) {
  return (
    <footer className="py-16 bg-[--background] border-t border-[--subtle]">
      <div className="grid-12">
        <div className="col-span-12 md:col-span-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-[--accent] mb-4">
              {brand.name}
            </h3>
            <p className="text-[--foreground]/60 max-w-md">
              {copy.footer.description}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <h4 className="font-semibold mb-3 text-[--secondary]">{copy.footer.sections.contact}</h4>
              <div className="space-y-2 text-sm">
                <a 
                  href={`https://t.me/${brand.contacts.telegram.slice(1)}`}
                  className="block hover:text-[--accent] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {brand.contacts.telegram}
                </a>
                <a 
                  href={`https://wa.me/${brand.contacts.whatsapp.replace(/[^0-9]/g, '')}`}
                  className="block hover:text-[--accent] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.footer.whatsapp}
                </a>
                <a 
                  href={`mailto:${brand.contacts.email}`}
                  className="block hover:text-[--accent] transition-colors"
                >
                  {brand.contacts.email}
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-[--secondary]">{copy.footer.sections.services}</h4>
              <div className="space-y-2 text-sm opacity-70">
                <div>{copy.footer.services_list.n8n}</div>
                <div>{copy.footer.services_list.chatbots}</div>
                <div>{copy.footer.services_list.qa}</div>
                <div>{copy.footer.services_list.llm}</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-[--secondary]">{copy.footer.sections.location}</h4>
              <div className="text-sm opacity-70">
                <div>{copy.footer.location_info.city}</div>
                <div>{copy.footer.location_info.remote}</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-[--secondary]">{copy.footer.sections.bot}</h4>
              <a 
                href={`https://t.me/${brand.contacts.bot.slice(1)}`}
                className="text-sm hover:text-[--accent] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {brand.contacts.bot}
              </a>
            </div>
          </div>
        </div>
        
        <div className="col-span-12 pt-8 border-t border-[--subtle] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-60">
            {copy.footer.rights}
          </p>
          <div className="flex items-center gap-4 text-sm opacity-60">
            <span>{copy.footer.made_with}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}