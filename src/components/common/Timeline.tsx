interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
      
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative pl-12">
            {/* Dot */}
            <div className={`absolute left-2 w-5 h-5 rounded-full border-4 ${
              index % 2 === 0 
                ? 'bg-accent border-accent/30' 
                : 'bg-primary border-primary/30'
            }`} />
            
            {/* Content */}
            <div className="bg-card rounded-lg p-4 shadow-elegant animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <span className={`text-sm font-semibold ${
                index % 2 === 0 ? 'text-accent' : 'text-primary'
              }`}>
                {item.year}
              </span>
              <h4 className="font-serif font-semibold text-foreground mt-1">
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
