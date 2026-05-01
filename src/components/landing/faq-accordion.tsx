import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

type FaqItem = {
  q: string
  a: string
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type='single' collapsible className='w-full'>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className='border-border/60 first:border-t'
        >
          <AccordionTrigger className='text-left text-base font-medium hover:no-underline py-5'>
            <span className='flex items-baseline gap-4 pr-4'>
              <span className='lk-section-num shrink-0'>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{item.q}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className='pl-12 pr-2 pb-5 text-muted-foreground leading-relaxed'>
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
