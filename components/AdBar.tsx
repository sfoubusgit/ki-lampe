/**
 * Ad Bar Component
 * 
 * Advertisement bar that spans 3 columns in the grid
 * Positioned after the first row of articles
 */
export function AdBar() {
  return (
    <div className="
      w-full
      h-full
      min-h-[200px]
      desktop:min-h-[300px]
      bg-gradient-to-br
      from-accent/10
      to-accent/5
      dark:from-accent/15
      dark:to-accent/10
      border
      border-[#0f0f0f]
      dark:border-[#e8e8e8]
      rounded-sm
      flex
      items-center
      justify-center
      transition-all
      duration-200
      ease
      hover:border-accent/30
      hover:bg-accent/15
      dark:hover:bg-accent/20
    ">
      <div className="text-center px-4">
        <div className="text-sm-custom font-mono uppercase tracking-wide text-foreground/40 mb-2">
          ADVERTISEMENT
        </div>
        <div className="text-xs-custom text-foreground/30">
          Ad Space
        </div>
      </div>
    </div>
  );
}
